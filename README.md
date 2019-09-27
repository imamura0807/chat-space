# CHAT-SPACE データベース設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :posts
- has_many :users_groups
- has_many :groups,  through:  :users_groups

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|up_at|datetime|null: false|
|user_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
### Association
- has_many :posts
- has_many :users_groups
- has_many :users,  through:  :users_groups
- has_many :groups_members
- has_many :members, through:  :groups_members

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users
- belongs_to :groups

## groups_membersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|member_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups
- belongs_to :members

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
### Association
- has_many :groups_members
- has_many :groups, through:  :groups_members