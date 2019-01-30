CREATE TABLE inout."EventSchedule"
(
    "ScheduleId" INTEGER PRIMARY KEY,
    "EventId" INTEGER REFERENCES inout."Event",
    "StartDT" TIMESTAMPZ,
    "EndDT" TIMESTAMPZ,
    "NumOccurrences" INTEGER DEFAULT 0,
    "EventSeq" INTEGER DEFAULT 1,
    "HasSchedule" boolean DEFAULT FALSE,
    "EventDesc" character(100) NULL,
    "SquadId" INTEGER REFERENCES inout."Squad",
    "StartDT" TIMESTAMPZ NOT NULL,
    "EndDT" TIMESTAMPZ NOT NULL,
    "Location" CHARACTER(100) NOT NULL,
    "Status" CHARACTER(1) NOT NULL DEFAULT "A",
    "MinUser" INTEGER DEFAULT 0 NOT NULL,
    "MaxUser" INTEGER DEFAULT 5 NOT NULL,
    "Created" TIMESTAMPZ NOT NULL,
    "CreatedBy" CHARACTER(25) NOT NULL,
    "Modified" TIMESTAMPZ NOT NULL,
    "ModifiedBy" CHARACTER (25) NOT NULL
);
