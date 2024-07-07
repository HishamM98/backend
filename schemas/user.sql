CREATE TABLE `user` (
    `id` int NOT NULL AUTO_INCREMENT,
    `fullname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `avatar` varchar(255) DEFAULT 'https://avatar.iran.liara.run/public',
    PRIMARY KEY (`id`),
    UNIQUE KEY `email_UNIQUE` (`email`)
);