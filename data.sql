INSERT INTO `colors`(`id`, `created_at`, `updated_at`, `name`) VALUES ('1',NOW(),NOW(),'Red'),
                                                                      ('2',NOW(),NOW(),'Blue'),
                                                                      ('3',NOW(),NOW(),'Green'),
                                                                      ('4',NOW(),NOW(),'Black'),
                                                                      ('5',NOW(),NOW(),'White');
INSERT INTO `sizes`(`id`, `created_at`, `updated_at`, `name`) VALUES ('1',NOW(),NOW(),'S'),
                                                                      ('2',NOW(),NOW(),'M'),
                                                                      ('3',NOW(),NOW(),'L'),
                                                                     ('4',NOW(),NOW(),'XL'),
                                                                     ('5',NOW(),NOW(),'XXL');
INSERT INTO `categories`(`id`, `created_at`, `updated_at`, `name`) VALUES ('1',NOW(),NOW(),'SPORT'),
                                                                     ('2',NOW(),NOW(),'BOOK');

INSERT INTO `users` (`id`, `created_at`, `updated_at`, `avatar_url`, `birthday`, `email`, `full_name`, `password`, `phone_number`, `user_status`, `role_id`) VALUES
    ('1', '2025-03-20 23:34:58.422511', '2025-03-20 23:34:58.422511', 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png', NULL, 'admin@g', 'admin', '$2a$10$RXBHzgK21cDEZ8hoe2O3aeDUAZaYmXtLNZW1GkDIX2NftoMBGdJZq', NULL, 0, 1);