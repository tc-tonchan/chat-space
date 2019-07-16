# README

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null:false| 
|email|string|null: fales, unique: true |
|password|string|null: fales, unique: true|

### Association
- has_many :messages
- has_many :group_users
- has_many :groups, through: :members

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group|string|null: false|

### Association
- has_many :messages
- has_many :group_users
- has_many :users, through: :group_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|null: false, foreign_key: true:|
|user_id|references|nill: false, foreign_key: true:|

### Association
- belongs_to :group
- belongs_to :user
