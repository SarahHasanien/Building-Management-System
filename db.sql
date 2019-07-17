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
/*************************************************************/
CREATE TABLE months (
 month integer,
 year integer,
 PRIMARY KEY (month, year)
);
/***********************************************/
CREATE TABLE entitlements (
 name TEXT NOT NULL PRIMARY KEY,
 type INTEGER NOT NULL
);
CREATE TABLE box (
 box_id INTEGER NOT NULL,
 value INTEGER NOT NULL
);
CREATE TABLE outgoings (
 out_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
 out_value INTEGER NOT NULL,
 out_date DATE,
 out_user INTEGER,
 FOREIGN KEY (out_user) REFERENCES user (user_id)
);
CREATE TABLE payments (
 pay_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
 pay_value INTEGER NOT NULL,
 pay_date DATE NOT NULL,
 pay_descr TEXT,
 pay_ent INTEGER,
 pay_mon INTEGER,
 pay_user INTEGER,
 FOREIGN KEY (pay_user) REFERENCES user (user_id),
 FOREIGN KEY (pay_ent) REFERENCES entitlements (name),
 FOREIGN KEY (pay_mon) REFERENCES months (month)
);
/********************/
INSERT INTO months ( month, year)
VALUES ( 7, 2019);
/**********type 0 for monthly entitlements and 1 for emergency********/
INSERT INTO entitlements ( name, type)
VALUES ( "Doorman Salary", 0);

INSERT INTO entitlements ( name, type)
VALUES ( "Electricity (Elevator and more)", 0);

INSERT INTO entitlements ( name, type)
VALUES ( "Cleaning", 0);

INSERT INTO entitlements ( name, type)
VALUES ( "Trash", 0);
/************************/
INSERT INTO box ( box_id,value)
VALUES (1,100);

INSERT INTO outgoings (out_value,out_date,out_user)
VALUES(50,2019-07-17,1);
out_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
 out_value INTEGER NOT NULL,
 out_date DATE,
 out_user INTEGER,