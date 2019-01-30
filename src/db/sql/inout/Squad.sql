CREATE TABLE inout."Squads"
(
    "SquadId" INTEGER PRIMARY KEY,
    "Name" CHARACTER(50) NOT NULL,
    "Status" CHARACTER(1) NOT NULL DEFAULT "A",
    "Created" TIMESTAMPZ NOT NULL,
    "CreatedBy" CHARACTER(25) NOT NULL,
    "Modified" TIMESTAMPZ NOT NULL,
    "ModifiedBy" CHARACTER (25) NOT NULL
);

CREATE INDEX squads_squadid ON inout."Squads" ("SquadId") INCLUDE ("Name");