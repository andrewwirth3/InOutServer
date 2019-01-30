CREATE TABLE inout."Users"
(
    "Username" CHARACTER(25) PRIMARY KEY,
    "Password" TEXT NOT NULL,
    "Name" CHARACTER(50) NOT NULL,
    "UserId" uuid NOT NULL DEFAULT gen_random_uuid(),
    "Email" CHARACTER(256) NULL,
    "Phone" CHARACTER(15) NULL,
    "Status" CHARACTER(1) NOT NULL DEFAULT "A",
    "Created" TIMESTAMPZ NOT NULL,
    "CreatedBy" CHARACTER(25) NOT NULL,
    "Modified" TIMESTAMPZ NOT NULL,
    "ModifiedBy" CHARACTER(25) NOT NULL
);

CREATE UNIQUE INDEX users_username ON inout."Users" ("UserName") INCLUDE ("Name");

CREATE INDEX users_userid ON inout."Users" ("UserId") INCLUDE ("Username", "Name");