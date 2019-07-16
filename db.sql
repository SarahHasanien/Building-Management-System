db name = BMS
CREATE TABLE user ( 
	user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	name TEXT NOT NULL,
    type INTEGER NOT NULL,
	email TEXT NOT NULL, 
    flat_number INTEGER, 
	password TEXT NULL );
/***********حسابات الحاج محمود والحاج اسماعيل***********/
INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Mahmoud Mohie', 0,
'Mahmoud-ElGamal@yahoo.com', 2,"war2_3enab" );

INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Esmail El-Gharabawy', 0,
'EsmailBeh@gmail.com', 1,"abcdef" );

/**********حسابات باقي سكان العمارة*************/
INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Mohamed Hasanien', 1,
'HasanienMohamed@gmail.com', 3,"123" );

INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Badrya El Shabrawy', 1,
'BadryaDodo@gmail.com', 4,"1234" );

INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Samira Samir', 1,
'Samira_Smsma@gmail.com', 5,"12345" );

INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Ahmed Mosaad', 1,
'Ahmed-M@hotmail.com', 6,"123456" );

INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Menna El-Shazly', 1,
'Shazlola@gmail.com', 7,"1234567" );

INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Mohamed Adel', 1,
'DolaMohamed@gmail.com', 8,"12345678" );

INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Lala Mohamed', 1,
'SetElBnat@gmail.com', 9,"123456789" );

INSERT INTO user ( name, type, email, flat_number, password )
VALUES ( 'Ibrahim Fattah', 1,
'Eng-Ibrahim@yahoo.com', 10,"1234567890" );

    