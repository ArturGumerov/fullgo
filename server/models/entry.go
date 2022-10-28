package models

import(
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct{
	ID     primitive.ObjectID `bson:"id"`
	Client *string            `json:"client"`
	Phone  *string            `json:"phone"`
	Device *string            `json:"device"`
	Price  *int               `json:"price"`
}