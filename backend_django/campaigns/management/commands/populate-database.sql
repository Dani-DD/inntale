-- POPULATE AUTH_USER TABLE
USE campaigns;

INSERT INTO
    `auth_user` (
        id,
        password,
        last_login,
        is_superuser,
        username,
        first_name,
        last_name,
        email,
        is_staff,
        is_active,
        date_joined
    )
VALUES
    (
        1,
        'pbkdf2_sha256$1000000$eJcUrXERv1EQyvwo4IgwKl$eYUXwcbvebPmn5SO4cEgF7t+TwzEVzXT8Jki92vCgGM=',
        '2025-05-02 16:13:46.083756',
        1,
        'inntale_superuser',
        '',
        '',
        'dan.wding@gmail.com',
        1,
        1,
        '2025-05-02 16:12:59.038782'
    );

-- POPULATE PLAYER TABLE
INSERT INTO
    `campaigns_player` (
        id,
        nickname,
        first_name,
        last_name,
        slug,
        profile_pic
    )
VALUES
    (
        1,
        'Matt',
        'mattia',
        'ceniti',
        'mattia-ceniti',
        NULL
    ),
    (
        2,
        'Project Leader',
        'simone',
        'rosini',
        'simone-rosini',
        'players/simone_rosini.png'
    ),
    (
        3,
        'Zio Gabrio',
        'gabrio',
        'pozzi',
        'gabrio-pozzi',
        'players/gabrio_pozzi.jpg'
    ),
    (
        4,
        'Kurolily',
        'sara',
        'stefanizzi',
        'sara-stefanizzi',
        'players/sara_stefanizzi.jpg'
    ),
    (
        5,
        'Giuly',
        'giulia',
        'bersani',
        'giulia-bersani',
        'players/giulia_bersani.jpg'
    ),
    (
        6,
        'Sire',
        'gianandrea',
        'muià',
        'gianandrea-muia',
        'players/gianandrea_muia.png'
    ),
    (
        7,
        'Eyes',
        'luca',
        'occhi',
        'luca-occhi',
        'players/luca_occhi.png'
    ),
    (
        8,
        'Manfre',
        'manfredi',
        'mo',
        'manfredi-mo',
        'players/manfredi_mo.png'
    ),
    (
        9,
        'Lapo',
        'lapo',
        'raspanti',
        'lapo-raspanti',
        NULL
    ),
    (
        10,
        'Andross',
        'andrea',
        'guagnini',
        'andrea-guagnini',
        'players/andrea_guagnini.jpg'
    ),
    (
        11,
        'Tommy',
        'tommaso',
        'amitrano',
        'tommaso-amitrano',
        NULL
    ),
    (
        12,
        'Pietro',
        'pietro',
        'ubaldi',
        'pietro-ubaldi',
        NULL
    ),
    (
        13,
        'MarkTheHammer',
        'marco',
        'arata',
        'marco-arata',
        NULL
    ),
    (
        14,
        'Leo',
        'leonardo',
        'brugnara',
        'leonardo-brugnara',
        NULL
    ),
    (
        15,
        'Roberta',
        'roberta',
        'sorge',
        'roberta-sorge',
        NULL
    ),
    (
        16,
        'Nicola',
        'nicola',
        'de gobbis',
        'nicola-de-gobbis',
        NULL
    ),
    (
        17,
        'Miguel',
        'miguel',
        'velasquez',
        'miguel-velasquez',
        NULL
    ),
    (
        18,
        'Lorenzo',
        'lorenzo',
        'pratt',
        'lorenzo-pratt',
        NULL
    ),
    (
        19,
        'Adrian',
        'adrian',
        'fartade',
        'adrian-fartade',
        NULL
    ),
    (
        20,
        'Valentina',
        'valentina',
        'lavalend',
        'valentina-lavalend',
        NULL
    ),
    (
        21,
        'Marco',
        'marco',
        'cioni',
        'marco-cioni',
        NULL
    ),
    (
        22,
        '151EG',
        'enrico',
        'gamba',
        'enrico-gamba',
        NULL
    ),
    (
        23,
        'Dario',
        'dario',
        'moccia',
        'dario-moccia',
        NULL
    ),
    (
        24,
        'Mario',
        'mario',
        'del pennino',
        'mario-del-pennino',
        NULL
    ),
    (
        25,
        'Ruby Rust',
        'chiara',
        'preziosi',
        'chiara-preziosi',
        NULL
    ),
    (
        26,
        'Gabri',
        'gabriele',
        'rubini',
        'gabriele-rubini',
        NULL
    ),
    (
        27,
        'Cloud',
        'claudio',
        'mastronardi',
        'claudio-mastronardi',
        NULL
    ),
    (
        28,
        'Il Rinoceronte',
        'daniele',
        'daccò',
        'daniele-dacco',
        NULL
    ),
    (
        29,
        'Giada',
        'giada',
        'taribelli',
        'giada-taribelli',
        NULL
    ),
    (
        30,
        'La Madre Dei Draghi',
        'laura',
        'lamadredeidraghi',
        'laura-lamadredeidraghi',
        NULL
    ),
    (
        31,
        'LuliZiv',
        'ludovica',
        'guspini',
        'ludovica-guspini',
        NULL
    ),
    (
        32,
        'Rob',
        'roberto',
        'ortu',
        'roberto-ortu',
        'players/roberto_ortu.png'
    );

-- POPULATE MANUAL TABLE
INSERT INTO
    `campaigns_manual` (id, name, slug)
VALUES
    (1, 'Savage Worlds', 'savage-worlds'),
    (2, 'Trail Of Cthulhu', 'trail-of-cthulhu'),
    (
        3,
        'Dungeons And Dragons 5e',
        'dungeons-and-dragons-5e'
    ),
    (4, 'Pathfinder', 'pathfinder'),
    (5, 'Kids On Bikes', 'kids-on-bikes'),
    (6, '7th Sea', '7th-sea'),
    (7, 'Kids On Brooms', 'kids-on-brooms'),
    (
        10,
        'Don''t Rest Your Head',
        'dont-rest-your-head'
    ),
    (
        11,
        'Vampire The Masquerade',
        'vampire-the-masquerade'
    ),
    (12, 'Broken Compass', 'broken-compass'),
    (13, 'Brancalonia', 'brancalonia');

-- POPULATE CAMPAIGN TABLE
INSERT INTO
    `campaigns_campaign` (
        id,
        name,
        season,
        is_edited,
        youtube_link,
        release_date,
        manual_id,
        slug,
        thumbnail
    )
VALUES
    (
        1,
        'Anime Selvagge (Francia)',
        1,
        0,
        'https://www.youtube.com/watch?v=gh6VGOerW80&list=PLoVHA-lOjjEBi74ModOwvn6Hxeibuj-6S',
        '2020-03-28',
        1,
        'anime-selvagge-francia-s1',
        'campaigns/anime_selvagge_francia3.jpg'
    ),
    (
        2,
        'Elevator Of Madness',
        1,
        0,
        'https://www.youtube.com/watch?v=VFZC4Nk8ahg&list=PLoVHA-lOjjEApqlKjZDCnlt3cpVf-_hbU',
        '2022-04-21',
        2,
        'elevator-of-madness-s1',
        'campaigns/elevator_of_madness2.jpg'
    ),
    (
        3,
        'Anime Selvagge (Francia)',
        2,
        0,
        'https://www.youtube.com/watch?v=Y6q0k-C1EUQ&list=PLoVHA-lOjjEBi74ModOwvn6Hxeibuj-6S&index=9',
        '2021-10-19',
        5,
        'anime-selvagge-francia-s2',
        'campaigns/anime_selvagge_francia3.jpg'
    ),
    (
        4,
        'Luxastra''s Lullaby',
        3,
        1,
        'https://www.youtube.com/watch?v=fPRxVYSFguc&list=PLFVd9VXb61Q1siXbAK78PyO-sbEUWDVuv',
        '2020-09-03',
        3,
        'luxastras-lullaby-s3',
        'campaigns/luxastra3.jpg'
    ),
    (
        5,
        'Luxastra''s Lullaby',
        1,
        1,
        'https://www.youtube.com/watch?v=MXlCB2GczKU&list=PLFVd9VXb61Q0rxcFOqwnw4QvW88dlyg7b',
        '2019-02-28',
        4,
        'luxastras-lullaby-s1',
        'campaigns/luxastra3.jpg'
    ),
    (
        6,
        'Luxastra''s Lullaby',
        2,
        1,
        'https://www.youtube.com/watch?v=ZjXrqltXOUE&list=PLFVd9VXb61Q3nThzHNDaB8Mee7-qoYU8X',
        '2019-09-19',
        3,
        'luxastras-lullaby-s2',
        'campaigns/luxastra3.jpg'
    ),
    (
        7,
        'Navigavia',
        2,
        1,
        'https://www.youtube.com/watch?v=J9xYEEWp2So&list=PLFVd9VXb61Q2o6epC0Q-LKtLKX667orR1',
        '2023-11-09',
        6,
        'navigavia-s2',
        'campaigns/navigavia.jpg'
    ),
    (
        8,
        'Navigavia',
        1,
        1,
        'https://www.youtube.com/watch?v=0lq6LI2kdkQ&list=PLFVd9VXb61Q3uyTtaPvMnXnX1O8J5IHbM',
        '2021-12-02',
        6,
        'navigavia-s1',
        'campaigns/navigavia.jpg'
    ),
    (
        9,
        'Augusta Sanguinorum',
        1,
        0,
        'https://www.youtube.com/watch?v=ESC339B54ns&list=PLoVHA-lOjjEB2W2bc2LPxlKNNjM3Qp25c',
        '2020-05-23',
        11,
        'augusta-sanguinorum-s1',
        'campaigns/augusta_sanguinorum2.jpg'
    ),
    (
        10,
        'Armored Soul',
        1,
        0,
        'https://www.youtube.com/watch?v=YqoDB9ZUSyQ&list=PLoVHA-lOjjED2L-j7OlXDqujHBq3DZuE6',
        '2020-07-04',
        3,
        'armored-soul-s1',
        'campaigns/armored_soul.jpg'
    ),
    (
        11,
        'Police Vanguard',
        1,
        0,
        'https://www.youtube.com/watch?v=2ANtEtSM7PI&list=PLoVHA-lOjjEB495kuCueQNtGfZ5wwk2FC',
        '2021-07-24',
        12,
        'police-vanguard-s1',
        'campaigns/police_vanguard2.jpg'
    ),
    (
        12,
        'Midnight Howl',
        1,
        0,
        'https://www.youtube.com/watch?v=PWn9x7Tbdm4&list=PLoVHA-lOjjEBRbLIYw9XiF7jVSHlpdqIa',
        '2023-02-13',
        7,
        'midnight-howl-s1',
        'campaigns/midnight_howl.jpg'
    ),
    (
        14,
        'Luxastra''s Dream',
        1,
        1,
        'https://www.youtube.com/watch?v=1zabpobPq8o&list=PLFVd9VXb61Q3wiDtiDrlAb7hgXFRQDlSN',
        '2022-11-17',
        3,
        'luxastras-dream-s1',
        'campaigns/luxastra3.jpg'
    );

-- POPULATE CAST TABLE
-- Anime selvagge 1
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (1, 'master', 1, 1);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (2, 'frank', 1, 2);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (3, 'aubrey', 1, 5);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (4, 'charlie', 1, 4);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (5, 'gaston', 1, 3);

-- Anime selvagge 2
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (11, 'master', 3, 1);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (12, 'gaston', 3, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (13, 'aubrey', 3, 5);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (14, 'charlie', 3, 4);

-- Armored Soul
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (72, 'master', 10, 7);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (73, 'jaxis', 10, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (74, 'jeltan', 10, 10);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (75, 'zeik', 10, 27);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (76, 'eldritch', 10, 28);

-- Augusta sanguinorum
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (67, 'master', 9, 6);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (68, 'lorenzo', 9, 24);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (69, 'vania', 9, 25);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (70, 'patrice', 9, 26);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (71, 'diego', 9, 1);

-- Elevator Of Madness
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (6, 'master', 2, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (7, 'eugene', 2, 8);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (8, 'heinrich', 2, 7);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (9, 'jane', 2, 4);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (10, 'derek', 2, 9);

-- Midnight Howl
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (82, 'master', 12, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (83, 'john', 12, 2);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (84, 'artemis', 12, 4);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (85, 'robert', 12, 7);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (86, 'robin', 12, 31);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (107, 'winter', 12, 10);

-- Luxastra 1
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (22, 'master', 5, 1);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (23, 'hann', 5, 2);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (24, 'shiran', 5, 4);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (25, 'dalia', 5, 5);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (26, 'galgith', 5, 6);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (27, 'rendar', 5, 10);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (28, 'letho', 5, 11);

-- Luxastra 2
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (31, 'master', 6, 1);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (32, 'hann', 6, 2);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (33, 'alastor', 6, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (34, 'shiran', 6, 4);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (35, 'dalia', 6, 5);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (36, 'galgith', 6, 6);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (37, 'boris', 6, 7);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (38, 'rendar', 6, 10);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (39, 'letho', 6, 11);

-- Luxastra 3
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (15, 'master', 4, 1);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (16, 'hann', 4, 2);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (17, 'shiran', 4, 4);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (18, 'galgith', 4, 6);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (19, 'rendar', 4, 10);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (20, 'letho', 4, 11);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (21, 'dalia', 4, 5);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (106, 'kenshi', 4, 32);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (29, 'alastor', 4, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (30, 'boris', 4, 7);

-- Luxastra 4
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (96, 'master', 14, 1);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (97, 'hann', 14, 2);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (98, 'alastor', 14, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (99, 'shiran', 14, 4);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (100, 'dalia', 14, 5);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (101, 'galgith', 14, 6);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (102, 'boris', 14, 7);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (103, 'rendar', 14, 10);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (105, 'kenshi', 14, 32);

-- Navigavia 1
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (49, 'john doe', 8, 1);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (50, 'kayla moldartson', 8, 5);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (51, 'master', 8, 7);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (52, 'kapa', 8, 12);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (53, 'john', 8, 13);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (54, 'bacto parrot', 8, 14);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (55, 'maria dubois', 8, 15);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (56, 'oliviai ottonovich', 8, 16);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (57, 'limerick vas cricket', 8, 17);

-- Navigavia 2
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (40, 'master', 7, 7);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (41, 'john doe', 7, 1);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (42, 'kayla moldartson', 7, 5);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (45, 'bacto parrot', 7, 14);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (47, 'oliviai ottonovich', 7, 16);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (48, 'limerick vas cricket', 7, 17);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (58, 'benjamin benji', 7, 4);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (59, 'roberto alejandro menendez', 7, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (60, 'attilio ponzio rebibbia', 7, 2);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (61, 'lemus', 7, 18);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (62, 'mi-rae temnyy', 7, 19);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (63, 'xibalba merida debuà', 7, 20);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (64, 'marco los perros', 7, 21);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (65, 'maria luisa pulchra gaia xiv', 7, 22);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (66, 'juan carlos demetrio di borgogna', 7, 23);

-- Police Vanguard
INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (77, 'master', 11, 7);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (78, 'riccardo benzoni', 11, 3);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (79, 'sergio montana', 11, 6);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (80, 'letizia cortez', 11, 29);

INSERT INTO
    campaigns_cast (id, `character`, campaign_id, player_id)
VALUES
    (81, 'sullyvan johnson', 11, 30);