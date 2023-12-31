CREATE TABLE User (
  UserID INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Username VARCHAR(50) UNIQUE NOT NULL,
  Email VARCHAR(100) NOT NULL,
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  Address TEXT NOT NULL,
  Phone VARCHAR(15) NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  Salt VARCHAR(255) NOT NULL
);
