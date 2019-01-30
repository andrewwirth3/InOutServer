CREATE TABLE inout."SquadMembers"
(
    "MemberId" INTEGER PRIMARY KEY,
    "Username" CHARACTER(50) REFERENCES inout."Users",
    "SquadId" INTEGER REFERENCES inout."Squads",
    "Status" CHARACTER(1) NOT NULL DEFAULT "A",
    "Sequence" INTEGER NOT NULL DEFAULT 1,
    "Created" TIMESTAMPZ NOT NULL,
    "CreatedBy" CHARACTER(25) NOT NULL,
    "Modified" TIMESTAMPZ NOT NULL,
    "ModifiedBy" CHARACTER (25) NOT NULL
);

CREATE INDEX squadmembers_squadid ON inout."SquadMembers" ("SquadId") INCLUDE ("Username", "Status");