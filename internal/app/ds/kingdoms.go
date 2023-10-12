package ds

import (
	"gorm.io/datatypes"
)

type Kingdom struct {
	Id          uint   `gorm:"primaryKey;AUTO_INCREMENT"`
	Name        string `gorm:"type:varchar(50);unique;not null"`
	Area        int    `gorm:"not null"`
	Capital     string `gorm:"type:varchar(50);not null"`
	Image       string `gorm:"type:bytea"`
	Description string `gorm:"size:255"`
	State       string `gorm:"type:varchar(50);not null"`
}

type User struct {
	Id   uint   `gorm:"primaryKey;AUTO_INCREMENT"`
	Name string `gorm:"type:varchar(50);unique;not null"`
	Rank string `gorm:"size:255"`
}

type Ruler struct {
	Id             uint           `gorm:"primaryKey;AUTO_INCREMENT"`
	Name           string         `gorm:"type:varchar(50);unique;not null"`
	State          string         `gorm:"type:varchar(50);not null"`
	DateOfBirth    datatypes.Date `gorm:"not null"`
	BeginGoverning datatypes.Date `gorm:"not null"`
	EndGoverning   datatypes.Date
}

type Ruling struct {
	Id             uint           `gorm:"primaryKey:AUTO_INCREMENT"`
	RulerRefer     int            `gorm:"not null"`
	KingdomRefer   int            `gorm:"not null"`
	Ruler          Ruler          `gorm:"foreignKey:RulerRefer"`
	Kingdom        Kingdom        `gorm:"foreignKey:KingdomRefer"`
	BeginGoverning datatypes.Date `gorm:"not null"`
	EndGoverning   datatypes.Date
}
