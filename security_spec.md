# Kayashunya Content Platform Security Specification

## 1. Data Invariants
1. Only the verified Owner (`physicaltospiritual@gmail.com`) or registered users with roles `['owner', 'super_admin', 'admin']` can modify global branding, app settings, home sections, navigation, courses, and audit logs.
2. Published content (`wisdom`, `sadhna`, `videos`, `audio`, `quotes`, `courses`, `sessions`, `pages`) is publicly readable to seekers for seamless reading and practice.
3. Draft, scheduled, archived, or trashed items can ONLY be viewed and managed by Owner / Admins.
4. User profiles (`/users/{userId}`) can only be viewed and modified by the owner of the profile (`request.auth.uid == userId`) or an Owner/Admin. Users cannot promote their own roles.
5. The Audit Log (`/auditLogs/{logId}`) is strictly append-only for admins and is immutable (cannot be updated or deleted).
6. Non-existent routes and documents fallback to default-deny catch-all rule.

## 2. Dirty Dozen Threat Vectors
1. **Unauthenticated Branding Hijack**: An unauthenticated user attempts to update `/branding/global` primaryColor or logoUrl. -> Expected: PERMISSION_DENIED.
2. **Role Self-Escalation**: Standard user attempts to change their own role to 'super_admin' on `/users/{uid}`. -> Expected: PERMISSION_DENIED.
3. **Draft Wisdom Leak**: Unauthenticated client queries `wisdom` documents where `status == 'draft'`. -> Expected: PERMISSION_DENIED.
4. **Audit Log Tampering**: Admin attempts an update or delete on `/auditLogs/{logId}`. -> Expected: PERMISSION_DENIED.
5. **Unauthorized Home Section Deletion**: Non-admin attempts `deleteDoc` on `/homeSections/{sectionId}`. -> Expected: PERMISSION_DENIED.
6. **Malicious Content Injection**: Non-admin attempts `setDoc` on `/wisdom/{id}` to inject spam. -> Expected: PERMISSION_DENIED.
7. **PII Snooping**: Authenticated user attempts to read another user's private record `/users/{otherUid}`. -> Expected: PERMISSION_DENIED.
8. **Catch-All Probe**: Request sent to arbitrary undefined collection `/secrets/{id}`. -> Expected: PERMISSION_DENIED.
9. **Settings Overwrite Attack**: Anonymous client sends write to `/appSettings/global`. -> Expected: PERMISSION_DENIED.
10. **Trash Restoration Exploit**: Regular user attempts to restore trashed courses or sadhna items. -> Expected: PERMISSION_DENIED.
11. **Media Library Wipe**: Standard user attempts to delete items from `/media/{mediaId}`. -> Expected: PERMISSION_DENIED.
12. **Navigation Menu Corruption**: Unauthenticated user attempts to overwrite navigation drawer or bottom navigation. -> Expected: PERMISSION_DENIED.
