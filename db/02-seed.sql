-- Seed data for e-commerce database
-- Based on the provided JSON data

-- Categories
INSERT INTO categories (name) VALUES
('all'),
('clothes'),
('tech');

-- Currencies
INSERT INTO currencies (id, label, symbol) VALUES
('USD', 'USD', '$');

-- Products
INSERT INTO products (id, name, inStock, description, category, brand) VALUES
('huarache-x-stussy-le', 'Nike Air Huarache Le', true, '<p>Great sneakers for everyday use!</p>', 'clothes', 'Nike x Stussy'),
('jacket-canada-goosee', 'Jacket', true, '<p>Awesome winter jacket</p>', 'clothes', 'Canada Goose'),
('ps-5', 'PlayStation 5', true, '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 'tech', 'Sony'),
('xbox-series-s', 'Xbox Series S 512GB', false, '<div><ul><li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li><li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li><li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li><li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li><li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li><li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li><li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li><li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li><li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li><li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li></ul></div>', 'tech', 'Microsoft'),
('apple-imac-2021', 'iMac 2021', true, 'The new iMac!', 'tech', 'Apple'),
('apple-iphone-12-pro', 'iPhone 12 Pro', true, 'This is iPhone 12. Nothing else to say.', 'tech', 'Apple'),
('apple-airpods-pro', 'AirPods Pro', false, '<h3>Magic like you\'ve never heard</h3><p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they\'re ready to use right out of the case.</p><h3>Active Noise Cancellation</h3><p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you\'re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.</p><h3>Transparency mode</h3><p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you\'re talking to people around you.</p><h3>All-new design</h3><p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p><h3>Amazing audio quality</h3><p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p><h3>Even more magical</h3><p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>', 'tech', 'Apple'),
('apple-airtag', 'AirTag', true, '<h1>Lose your knack for losing things.</h1><p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they\'re on your radar in the Find My app. AirTag has your back.</p>', 'tech', 'Apple');

-- Product Gallery Images
INSERT INTO product_gallery (product_id, image_url, display_order) VALUES
-- Nike Air Huarache Le
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087', 1),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087', 2),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087', 3),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087', 4),
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087', 5),

-- Jacket
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg', 1),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg', 2),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg', 3),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg', 4),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg', 5),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png', 6),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png', 7),

-- PlayStation 5
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg', 1),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg', 2),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg', 3),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg', 4),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg', 5),

-- Xbox Series S
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg', 1),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg', 2),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg', 3),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg', 4),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg', 5),

-- iMac 2021
('apple-imac-2021', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000', 1),

-- iPhone 12 Pro
('apple-iphone-12-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000', 1),

-- AirPods Pro
('apple-airpods-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000', 1),

-- AirTag
('apple-airtag', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000', 1);

-- Attribute Sets
INSERT INTO attribute_sets (name, type, product_id) VALUES
-- Nike Air Huarache Le
('Size', 'text', 'huarache-x-stussy-le'),

-- Jacket
('Size', 'text', 'jacket-canada-goosee'),

-- PlayStation 5
('Color', 'swatch', 'ps-5'),
('Capacity', 'text', 'ps-5'),

-- Xbox Series S
('Color', 'swatch', 'xbox-series-s'),
('Capacity', 'text', 'xbox-series-s'),

-- iMac 2021
('Capacity', 'text', 'apple-imac-2021'),
('With USB 3 ports', 'text', 'apple-imac-2021'),
('Touch ID in keyboard', 'text', 'apple-imac-2021'),

-- iPhone 12 Pro
('Capacity', 'text', 'apple-iphone-12-pro'),
('Color', 'swatch', 'apple-iphone-12-pro');

-- Attributes
INSERT INTO attributes (display_value, value, attribute_set_id) VALUES
-- Nike Air Huarache Le Size (attribute_set_id = 1)
('40', '40', 1),
('41', '41', 1),
('42', '42', 1),
('43', '43', 1),

-- Jacket Size (attribute_set_id = 2)
('Small', 'S', 2),
('Medium', 'M', 2),
('Large', 'L', 2),
('Extra Large', 'XL', 2),

-- PlayStation 5 Color (attribute_set_id = 3)
('Green', '#44FF03', 3),
('Cyan', '#03FFF7', 3),
('Blue', '#030BFF', 3),
('Black', '#000000', 3),
('White', '#FFFFFF', 3),

-- PlayStation 5 Capacity (attribute_set_id = 4)
('512G', '512G', 4),
('1T', '1T', 4),

-- Xbox Series S Color (attribute_set_id = 5)
('Green', '#44FF03', 5),
('Cyan', '#03FFF7', 5),
('Blue', '#030BFF', 5),
('Black', '#000000', 5),
('White', '#FFFFFF', 5),

-- Xbox Series S Capacity (attribute_set_id = 6)
('512G', '512G', 6),
('1T', '1T', 6),

-- iMac 2021 Capacity (attribute_set_id = 7)
('256GB', '256GB', 7),
('512GB', '512GB', 7),

-- iMac 2021 USB 3 ports (attribute_set_id = 8)
('Yes', 'Yes', 8),
('No', 'No', 8),

-- iMac 2021 Touch ID (attribute_set_id = 9)
('Yes', 'Yes', 9),
('No', 'No', 9),

-- iPhone 12 Pro Capacity (attribute_set_id = 10)
('512G', '512G', 10),
('1T', '1T', 10),

-- iPhone 12 Pro Color (attribute_set_id = 11)
('Green', '#44FF03', 11),
('Cyan', '#03FFF7', 11),
('Blue', '#030BFF', 11),
('Black', '#000000', 11),
('White', '#FFFFFF', 11);

-- Prices
INSERT INTO prices (amount, currency_id) VALUES
(144.69, 'USD'),
(518.47, 'USD'),
(844.02, 'USD'),
(333.99, 'USD'),
(1688.03, 'USD'),
(1000.76, 'USD'),
(300.23, 'USD'),
(120.57, 'USD');

-- Product Prices
INSERT INTO product_prices (product_id, price_id) VALUES
('huarache-x-stussy-le', 1),
('jacket-canada-goosee', 2),
('ps-5', 3),
('xbox-series-s', 4),
('apple-imac-2021', 5),
('apple-iphone-12-pro', 6),
('apple-airpods-pro', 7),
('apple-airtag', 8);
