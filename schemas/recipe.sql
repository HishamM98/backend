-- Active: 1719340213537@@127.0.0.1@3306@recipesharing

create Table `recipe` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(16) NOT NULL,
    `description` VARCHAR(255),
    `image` VARCHAR(255),
    `vegitarian` TINYINT(1) DEFAULT 0,
    `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `likes` VARCHAR(2000) DEFAULT NULL,
    `user_id` INT NOT NULL,
    Foreign Key (user_id) REFERENCES user (id)
);