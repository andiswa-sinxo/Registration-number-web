create table town (
    id serial not null primary key,
    location text not null,
    code text not null 
);

create table reg(
    id serial not null primary key,
    reg_no text not null,
    code_id int not null,
    foreign key (code_id) references town(id)
);

INSERT INTO town(location, code) VALUES ('Cape Town', 'CA');
INSERT INTO town(location, code) VALUES ('Paarl', 'CJ');
INSERT INTO town(location, code) VALUES ('Bellville', 'CY');