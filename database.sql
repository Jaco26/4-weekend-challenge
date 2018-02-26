CREATE TABLE pictures
(
	id SERIAL PRIMARY KEY,
	url VARCHAR,
	synopsis VARCHAR,
	up_votes INT,
	view_count INT
);

CREATE TABLE comments
(
	id SERIAL PRIMARY KEY,
	comment VARCHAR
);

CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
	username VARCHAR
);


CREATE TABLE pictures_comments_users
(
	id SERIAL PRIMARY KEY,
	picture_id INT references pictures,
	comment_id INT references comments,
	user_id INT references users
);
 

INSERT INTO pictures
	(url, synopsis, up_votes, view_count )
VALUES
	('./images/door-richard-1.png', 'This is Richard Parker. He is the neighbor cat. He comes to our door sometimes.', 0, 0),
	('./images/door-richard-2.png', 'Richard Parker will go into anyone''s house.', 0, 0),
	('./images/may-day-1.png', 'These are three adults standing around before the May Day parade.', 0, 0),
	('./images/door-richard-3.png', 'Richard Parker is very friendly and asks everyone for belly rubs.', 0, 0),
	('./images/may-day-3.png', 'This is also pre May Day parade. The May Day parade is wicked sweet!', 0, 0),
	('./images/may-day-2.png', 'These are some more crazy kids at the May Day parade.', 0, 0);
 
