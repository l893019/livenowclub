# Google Ads Setup for Cancer Guide

## Overview
This guide helps you set up Google Ads to reach people searching for cancer support and resources.

## Budget Recommendation
- **Starter Budget**: $500-1000/month
- **Sustainable Budget**: $1500-2500/month
- **CPC Estimate**: $1-3 per click for cancer-related keywords
- **Expected Traffic**: 300-800 visitors/month at starter budget

## Step 1: Create Google Ads Account

1. Go to [ads.google.com](https://ads.google.com)
2. Sign in with your Google account (use louisesireland@gmail.com or create dedicated account)
3. Click "Start Now" to create first campaign

## Step 2: Install Google Ads Conversion Tracking

Add this code to track when people download the PDF or visit key pages:

```typescript
// Add to src/app/layout.tsx in the <head> section
{process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=AW-${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
        `,
      }}
    />
  </>
)}
```

Add to `.env.local`:
```
NEXT_PUBLIC_GOOGLE_ADS_ID=XXXXXXXXXX
```

## Step 3: Keyword Strategy

### Primary Keywords (High Intent)
- "what to do after cancer diagnosis"
- "cancer treatment guide"
- "how to prepare for chemotherapy"
- "newly diagnosed with cancer"
- "cancer patient resources"
- "free cancer guide"
- "cancer support for caregivers"
- "what to expect during cancer treatment"

### Secondary Keywords
- "cancer diagnosis help"
- "chemotherapy side effects tips"
- "radiation therapy advice"
- "cancer survivor guide"
- "supporting someone with cancer"
- "cancer caregiver resources"

### Long-tail Keywords (Lower cost, high conversion)
- "what i wish i knew before chemo"
- "practical advice for cancer patients"
- "how to help friend with cancer"
- "cancer treatment preparation checklist"

## Step 4: Ad Copy (Ready to Use)

### Ad Group 1: Newly Diagnosed

**Headline 1**: Free Cancer Guide for Newly Diagnosed
**Headline 2**: Everything I Wish I'd Known
**Headline 3**: Written by a Survivor | Download PDF

**Description 1**: Comprehensive guide covering diagnosis, treatment prep, and what to expect. Free PDF download. From cervical cancer survivor.
**Description 2**: Practical advice for patients & caregivers. Resources, tips, and support. Start here.

**Final URL**: https://livenowclub.com/navigate/cancer

### Ad Group 2: Treatment Support

**Headline 1**: Cancer Treatment Guide & Tips
**Headline 2**: Practical Advice from a Survivor
**Headline 3**: Free Resources | Chemo & Radiation

**Description 1**: Navigate treatment with confidence. Tips for managing side effects, what to prepare, and how to support your body.
**Description 2**: Honest guide from someone who's been there. Free PDF download available.

**Final URL**: https://livenowclub.com/read/expecting-the-unexpected

### Ad Group 3: Caregivers

**Headline 1**: How to Support Someone With Cancer
**Headline 2**: Caregiver Guide from a Patient
**Headline 3**: What Really Helps | Free Guide

**Description 1**: Learn what cancer patients actually need from caregivers. Real advice from a survivor on how to show up and help.
**Description 2**: Practical tips for supporting a loved one through treatment. Free download.

**Final URL**: https://livenowclub.com/read/expecting-the-unexpected#how-do-you-support-a-friend-with-cancer

## Step 5: Campaign Structure

```
Campaign: Cancer Support Guide
├── Ad Group: Newly Diagnosed
│   ├── Keywords: newly diagnosed, what to do after diagnosis, etc.
│   └── Ads: 3-4 variations
├── Ad Group: Treatment Guidance
│   ├── Keywords: chemotherapy tips, radiation advice, etc.
│   └── Ads: 3-4 variations
└── Ad Group: Caregiver Support
    ├── Keywords: how to help cancer patient, supporting someone, etc.
    └── Ads: 3-4 variations
```

## Step 6: Targeting Settings

- **Location**: United States (can expand to English-speaking countries)
- **Language**: English
- **Network**: Google Search only (not Display)
- **Devices**: All devices
- **Schedule**: All days, all hours (cancer doesn't keep business hours)

## Step 7: Bidding Strategy

**For New Campaign**:
- Start with "Maximize Clicks"
- Set max CPC at $2.50
- After 30 days and 50+ conversions, switch to "Maximize Conversions"

## Step 8: Conversion Goals

Set up these conversions to track success:

1. **PDF Download** (Primary)
   - Track clicks on PDF download link
   - Value: Assign $5 value

2. **Full Guide Read** (Secondary)
   - Track page scroll depth > 75% on expecting-the-unexpected
   - Value: Assign $3 value

3. **Time on Site** (Engagement)
   - Track sessions > 3 minutes
   - Value: Assign $1 value

## Step 9: Negative Keywords

Add these to prevent wasted spend:
- jobs
- salary
- training
- courses
- classes
- lawsuit
- lawyer
- attorney
- buy
- purchase (unless you're selling)
- free (can attract non-serious traffic)

## Expected Results

### Month 1
- 300-500 clicks
- 20-40 PDF downloads
- 10-25 full guide reads
- Cost per acquisition: $15-25

### Month 3+ (Optimized)
- 600-900 clicks
- 50-90 PDF downloads
- 30-60 full guide reads
- Cost per acquisition: $8-15

## Monthly Optimization Checklist

- [ ] Review search terms report, add negative keywords
- [ ] Pause underperforming ads
- [ ] Test new ad copy
- [ ] Adjust bids on high-performing keywords
- [ ] Check quality score, improve landing pages
- [ ] Review conversion data
- [ ] Adjust budget allocation by ad group

## Notes

- Google Ads offers $500 in free ad credit for new advertisers (check current promotions)
- Cancer-related ads must comply with Google's Healthcare and Medicines policy
- This is educational content, not medical advice - make sure ads reflect that
- Consider running during Cancer Awareness months for lower CPCs (October for Breast, January for Cervical, etc.)
