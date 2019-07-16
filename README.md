# README

## membersテーブル
This README would normally document whatever steps are necessary to get the
application up and running.

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
Things you may want to cover:

### Association
- belongs_to :group
- belongs_to :user
* Ruby version

## usersテーブル
* System dependencies

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null:false| 
|email|string|null: fales, unique: true |
|password|string|null: fales, unique: true|
* Configuration