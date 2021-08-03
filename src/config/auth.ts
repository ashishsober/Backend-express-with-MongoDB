export enum DBURL {
	URL = "mongodb://localhost:27017/data",
	PROD_URL = "mongodb+srv://test:test123@truckbypass.g6x5m.mongodb.net/truckbypass?retryWrites=true&w=majority",
	dockerMongoExpress = "mongodb://admin:password@mongodb:27017/admin",
	replicaset = "mongodb://mongo1:27017,mongo2:27018,mongo3:27019/test?replicaSet=my-mongo-set",
	toRundockerMongoExpressLocally = "mongodb://admin:password@localhost:27017/admin"
}
