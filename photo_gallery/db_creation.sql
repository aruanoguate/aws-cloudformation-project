CREATE DATABASE photo_gallery;

USE photo_gallery;

CREATE TABLE photo 
( 
	id int unsigned not null auto_increment, 
    name varchar(20) not null, 
    description varchar(1000) null,
    original_url varchar(500) not null, 
    thumbnail_url varchar(500) not null, 
    constraint pk_photo primary key (id) 
);

insert into photo (name, description, original_url, thumbnail_url)
values ('test', 'test description', 'https://s3.us-east-2.amazonaws.com/awslandivar.images/test01.jpg', 'https://s3.us-east-2.amazonaws.com/awslandivar.imagesresized/resized-test01.jpg');

select	*
from	photo
limit 10;