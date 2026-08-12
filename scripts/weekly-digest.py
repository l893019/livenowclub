#!/usr/bin/env python3
"""Weekly livenowclub.com digest, emailed to Louise via her Gmail.

Pulls the site stats API (admin key from ~/.livenowclub-admin-key), compares
this week to last week, and sends an HTML digest using the Gmail API with the
OAuth credentials stored by workspace-mcp. Scheduled by launchd
(com.louiseireland.livenowclub-digest, Mondays 9:00).

Run manually: python3 scripts/weekly-digest.py
"""

import base64
import json
import pathlib
import urllib.request
import urllib.parse
from datetime import date, timedelta
from email.mime.text import MIMEText

HOME = pathlib.Path.home()
ADMIN_KEY = (HOME / ".livenowclub-admin-key").read_text().strip()
GMAIL_CREDS = HOME / ".google_workspace_mcp/credentials/louisesireland@gmail.com.json"
TO = "louisesireland@gmail.com"
BASE = "https://livenowclub.com"


def api(path):
    req = urllib.request.Request(f"{BASE}{path}", headers={"Authorization": f"Bearer {ADMIN_KEY}"})
    return json.load(urllib.request.urlopen(req, timeout=30))


def split_weeks(daily):
    """daily: {date: n} for 14 days -> (this_week_total, last_week_total)"""
    today = date.today()
    this_week = sum(n for d, n in daily.items() if (today - date.fromisoformat(d)).days < 7)
    last_week = sum(n for d, n in daily.items() if 7 <= (today - date.fromisoformat(d)).days < 14)
    return this_week, last_week


def arrow(cur, prev):
    if prev == 0:
        return ""
    change = 100 * (cur - prev) / prev
    return f" ({'+' if change >= 0 else ''}{change:.0f}%)"


def substack_section():
    """Public archive API: likes/comments per post, with deltas vs last run."""
    state_file = HOME / "Documents/livenowclub-digests/.substack-state.json"
    try:
        req = urllib.request.Request(
            "https://louiseireland.substack.com/api/v1/archive?sort=new&limit=25",
            headers={"User-Agent": "Mozilla/5.0"},
        )
        posts = json.load(urllib.request.urlopen(req, timeout=30))
    except Exception as e:
        return f"<p style='font-size:13px;color:#888'>Substack data unavailable this week ({e})</p>"

    prev = {}
    if state_file.exists():
        try:
            prev = json.loads(state_file.read_text())
        except Exception:
            prev = {}

    cutoff = (date.today() - timedelta(days=7)).isoformat()
    rows, state = [], {}
    for p in posts:
        pid = str(p.get("id"))
        likes = (p.get("reactions") or {}).get("❤", 0) or 0
        comments = p.get("comment_count", 0) or 0
        state[pid] = {"likes": likes, "comments": comments, "title": p.get("title", "")}
        d_likes = likes - prev.get(pid, {}).get("likes", likes)
        d_comments = comments - prev.get(pid, {}).get("comments", comments)
        is_new = (p.get("post_date", "") or "")[:10] >= cutoff
        if is_new or d_likes > 0 or d_comments > 0:
            tag = "new this week" if is_new else "gained this week"
            delta = ""
            if not is_new:
                bits = []
                if d_likes: bits.append(f"+{d_likes} likes")
                if d_comments: bits.append(f"+{d_comments} comments")
                delta = " (" + ", ".join(bits) + ")"
            rows.append(
                f"<tr><td style='padding:3px 12px 3px 0'>{p.get('title','')}</td>"
                f"<td align='right'>{likes} &hearts; / {comments} &#128172;</td>"
                f"<td style='padding-left:10px;font-size:12px;color:#888'>{tag}{delta}</td></tr>"
            )

    state_file.parent.mkdir(parents=True, exist_ok=True)
    state_file.write_text(json.dumps(state))

    if not rows:
        rows = ["<tr><td style='font-size:13px;color:#888'>No new posts or engagement changes this week</td></tr>"]
    return "<table style='font-size:14px'>" + "".join(rows[:8]) + "</table>"


def build_html():
    d = api("/api/stats?days=14")
    signups = api("/api/subscribe").get("signups", [])

    pv_now, pv_prev = split_weeks(d["pageviews"])
    vis_now, vis_prev = split_weeks(d["visitors"])

    cutoff = (date.today() - timedelta(days=7)).isoformat()
    week_signups = [s for s in signups if s.get("timestamp", "") >= cutoff]
    undelivered = [s for s in week_signups if s.get("substackStatus") == "reading-email" and not s.get("readingSent")]

    top_pages = "".join(
        f"<tr><td style='padding:3px 12px 3px 0'>{p['page']}</td><td align='right'>{p['views']}</td></tr>"
        for p in d["topPages"][:8]
    )
    refs = sorted(d["referrers"].items(), key=lambda x: -x[1])[:6]
    top_refs = "".join(
        f"<tr><td style='padding:3px 12px 3px 0'>{r.replace('https://', '').rstrip('/')}</td><td align='right'>{n}</td></tr>"
        for r, n in refs
    )
    ev = d.get("events", {})
    acq = d.get("acquisition", {}) or {}
    acq_rows = "".join(
        f"<tr><td style='padding:3px 12px 3px 0'>{k}</td><td align='right'>{v}</td>"
        f"<td align='right'>{(acq.get('signups') or {}).get(k, 0)}</td></tr>"
        for k, v in sorted((acq.get("pageviews") or {}).items(), key=lambda x: -x[1])
    )

    warn = ""
    if undelivered:
        warn = (
            f"<p style='color:#b3261e'><b>{len(undelivered)} reader(s) asked for their reading "
            f"and no email was sent</b> — Resend domain verification is still pending.</p>"
        )

    style = "font-family: Georgia, serif; color: #2d2a26; max-width: 560px; margin: 0 auto;"
    h = "margin: 24px 0 6px; font-size: 15px; color: #e8178a; text-transform: uppercase; letter-spacing: .08em;"
    return f"""
<div style="{style}">
  <h1 style="font-weight: 400; font-size: 22px;">livenowclub.com, week of {cutoff}</h1>
  <p><b>{pv_now}</b> pageviews{arrow(pv_now, pv_prev)} &middot; <b>{vis_now}</b> visitors{arrow(vis_now, vis_prev)}
  &middot; <b>{len(week_signups)}</b> signup(s) this week &middot; {d['emails']['total']} all-time</p>
  {warn}
  <h2 style="{h}">Top pages (14d)</h2><table style="font-size:14px">{top_pages}</table>
  <h2 style="{h}">Referrers (14d)</h2><table style="font-size:14px">{top_refs}</table>
  <h2 style="{h}">Funnel (14d)</h2>
  <table style="font-size:14px">
    <tr><td style='padding:3px 12px 3px 0'>Email box impressions</td><td align='right'>{ev.get('email_capture_impression', 0)}</td></tr>
    <tr><td style='padding:3px 12px 3px 0'>Slide-in shown / dismissed</td><td align='right'>{ev.get('scroll_slidein_shown', 0)} / {ev.get('scroll_slidein_dismissed', 0)}</td></tr>
    <tr><td style='padding:3px 12px 3px 0'>Quiz started / completed</td><td align='right'>{ev.get('quiz_started', 0)} / {ev.get('quiz_completed', 0)}</td></tr>
    <tr><td style='padding:3px 12px 3px 0'>Story arc next-clicks</td><td align='right'>{ev.get('story_arc_next_click', 0)}</td></tr>
    <tr><td style='padding:3px 12px 3px 0'>Wonder read-next clicks</td><td align='right'>{ev.get('read_next_click', 0)}</td></tr>
  </table>
  <h2 style="{h}">Substack</h2>
  {substack_section()}
  <h2 style="{h}">Campaigns (utm, 14d)</h2>
  <table style="font-size:14px"><tr><td></td><td align='right'>views</td><td align='right'>signups</td></tr>{acq_rows or '<tr><td>none</td></tr>'}</table>
  <p style="margin-top: 28px; font-size: 12px; color: rgba(45,42,38,.5);">
    Sent by the weekly digest job on your Mac. Full dashboard: {BASE}/stats
  </p>
</div>
"""


def gmail_send(html):
    c = json.load(open(GMAIL_CREDS))
    data = urllib.parse.urlencode({
        "client_id": c["client_id"], "client_secret": c["client_secret"],
        "refresh_token": c["refresh_token"], "grant_type": "refresh_token",
    }).encode()
    tok = json.load(urllib.request.urlopen(urllib.request.Request(c["token_uri"], data=data), timeout=30))

    msg = MIMEText(html, "html")
    msg["To"] = TO
    msg["Subject"] = f"livenowclub weekly digest · {date.today().isoformat()}"
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    req = urllib.request.Request(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        data=json.dumps({"raw": raw}).encode(),
        headers={"Authorization": f"Bearer {tok['access_token']}", "Content-Type": "application/json"},
    )
    r = json.load(urllib.request.urlopen(req, timeout=30))
    print("digest sent, message id:", r.get("id"))


def save_and_open(html):
    outdir = HOME / "Documents/livenowclub-digests"
    outdir.mkdir(parents=True, exist_ok=True)
    out = outdir / f"digest-{date.today().isoformat()}.html"
    out.write_text(f"<!doctype html><meta charset='utf-8'><title>livenowclub digest</title>{html}")
    import subprocess
    subprocess.run(["open", str(out)], check=False)
    print("digest opened:", out)


if __name__ == "__main__":
    html = build_html()
    try:
        gmail_send(html)
    except Exception as e:
        # Gmail OAuth tokens for testing-mode apps expire weekly; fall back
        # to opening the digest locally so the report always arrives.
        print("gmail send failed, opening locally:", e)
        save_and_open(html)
