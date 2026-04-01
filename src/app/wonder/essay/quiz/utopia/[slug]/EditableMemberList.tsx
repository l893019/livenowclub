"use client";

import { useState, useEffect } from "react";

type Member = {
  id: string;
  name: string;
  archetype: string;
  isFounder?: boolean;
};

type ArchetypeData = {
  name: string;
  color: string;
};

type EditableMemberListProps = {
  members: Member[];
  createdBy: string;
  slug: string;
  archetypeData: Record<string, ArchetypeData>;
};

export default function EditableMemberList({
  members,
  createdBy,
  slug,
  archetypeData,
}: EditableMemberListProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [memberNames, setMemberNames] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Get current user ID from localStorage
    const userId = localStorage.getItem("quiz-user-id");
    setCurrentUserId(userId);

    // Initialize member names
    const names: Record<string, string> = {};
    members.forEach((m) => {
      names[m.id] = m.name;
    });
    setMemberNames(names);
  }, [members]);

  const startEditing = (member: Member) => {
    setEditingId(member.id);
    setEditName(memberNames[member.id] || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async () => {
    if (!editingId || !editName.trim()) return;

    setSaving(true);
    try {
      const response = await fetch("/api/utopia/update-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editingId,
          name: editName.trim(),
          utopiaSlug: slug,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMemberNames((prev) => ({
          ...prev,
          [editingId]: data.name,
        }));
        // Also update localStorage
        const stored = localStorage.getItem("quiz-user-result");
        if (stored) {
          const result = JSON.parse(stored);
          result.name = data.name;
          localStorage.setItem("quiz-user-result", JSON.stringify(result));
        }
      }
    } catch (error) {
      console.error("Failed to update name:", error);
    }
    setSaving(false);
    setEditingId(null);
    setEditName("");
  };

  // Group members by archetype
  const grouped: Record<string, Member[]> = {};
  members.forEach((member) => {
    if (!grouped[member.archetype]) {
      grouped[member.archetype] = [];
    }
    grouped[member.archetype].push(member);
  });

  // Sort by count (most members first)
  const sortedArchetypes = Object.entries(grouped).sort(
    (a, b) => b[1].length - a[1].length
  );

  return (
    <div className="members-grid">
      {sortedArchetypes.map(([archetype, archMembers]) => {
        const data = archetypeData[archetype];
        return (
          <div key={archetype} className="archetype-group">
            <div
              className="archetype-name"
              style={{ color: data?.color || "#666" }}
            >
              {data?.name || archetype}
            </div>
            <div className="member-names">
              {archMembers.map((member, idx) => {
                const isCurrentUser = member.id === currentUserId;
                const isEditing = editingId === member.id;
                const displayName = memberNames[member.id] || member.name || "Anonymous";
                const isFounder = member.id === createdBy;

                return (
                  <span key={member.id}>
                    {idx > 0 && ", "}
                    {isEditing ? (
                      <span className="edit-inline">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEditing();
                          }}
                          className="edit-input"
                          autoFocus
                          disabled={saving}
                        />
                        <button onClick={saveEdit} disabled={saving} className="edit-save">
                          {saving ? "..." : "Save"}
                        </button>
                        <button onClick={cancelEditing} className="edit-cancel">
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <span className="member-name-wrapper">
                        <span className={isCurrentUser ? "member-name-you" : ""}>
                          {displayName}
                        </span>
                        {isFounder && " (founder)"}
                        {isCurrentUser && !isFounder && " (you)"}
                        {isCurrentUser && (
                          <button
                            onClick={() => startEditing(member)}
                            className="edit-btn"
                            title="Edit your name"
                          >
                            edit
                          </button>
                        )}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .members-grid {
          display: grid;
          gap: 24px;
        }
        .archetype-group {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        }
        .archetype-name {
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }
        .member-names {
          font-size: 1.1rem;
          color: var(--text, #2d2a26);
          line-height: 1.8;
        }
        .member-name-wrapper {
          display: inline;
        }
        .member-name-you {
          font-weight: 500;
        }
        .edit-btn {
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--text-muted, rgba(45, 42, 38, 0.45));
          cursor: pointer;
          padding: 2px 6px;
          margin-left: 4px;
          text-decoration: underline;
          font-family: inherit;
        }
        .edit-btn:hover {
          color: var(--accent-pink, #e8178a);
        }
        .edit-inline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .edit-input {
          font-size: 1rem;
          padding: 4px 8px;
          border: 1px solid var(--accent-pink, #e8178a);
          border-radius: 4px;
          font-family: inherit;
          width: 150px;
        }
        .edit-input:focus {
          outline: none;
        }
        .edit-save,
        .edit-cancel {
          background: none;
          border: none;
          font-size: 0.8rem;
          cursor: pointer;
          padding: 4px 8px;
          font-family: inherit;
        }
        .edit-save {
          color: var(--accent-pink, #e8178a);
          font-weight: 500;
        }
        .edit-cancel {
          color: var(--text-muted, rgba(45, 42, 38, 0.45));
        }
        .edit-save:hover,
        .edit-cancel:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
