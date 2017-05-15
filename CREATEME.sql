CREATE DATABASE db_haocbackend;

use db_haocbackend;

CREATE TABLE IF NOT EXISTS lists (
    list_id int unsigned auto_increment PRIMARY KEY,
    list_name varchar(255) NOT NULL,
    is_deleted boolean DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id int unsigned auto_increment PRIMARY KEY,
    list_id int FOREIGN KEY REFERENCES lists(list_id),
    task_name varchar(255) NOT NULL,
    task_status varchar(255) DEFAULT "CREATED",
    is_deleted boolean DEFAULT 0
);

CREATE TABLE IF NOT EXISTS users (
    user_id int unsigned auto_increment PRIMARY KEY,
    user_name varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL    
);

CREATE TABLE IF NOT EXISTS tokens (
    user_id int FOREIGN KEY REFERENCES lists(list_id),
    token varchar (255) NOT NULL,
    datetime TIMESTAMP default CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS changelog (
    logsequence int unsigned auto_increment PRIMARY KEY,
    table_name varchar (255) NOT NULL,
    table_item_id int unsigned,
    action varchar (255) NOT NULL,
    user_id int unsigned NOT NULL,
    datetime TIMESTAMP default CURRENT_TIMESTAMP
);


