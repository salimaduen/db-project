CREATE TABLE IF NOT EXISTS Product (
    ProductID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Slug VARCHAR(255) NOT NULL,
    StockQuantity INT NOT NULL,
    CategoryID INT,
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
    CONSTRAINT SLUG_UNIQUE UNIQUE (Slug)
);
