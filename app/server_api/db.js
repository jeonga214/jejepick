var mysql = require('mysql');
var connection = mysql.createConnection({
	host: process.env.NEXT_PUBLIC_HOST,
	user: process.env.NEXT_PUBLIC_USER,
	password: process.env.NEXT_PUBLIC_PASSWORD,
	database: process.env.NEXT_PUBLIC_DATABASE,
	port: process.env.NEXT_PUBLIC_PORT
});
//connection 이 실행되는 타이밍은 접속정보이므로 함수내에서 실행하는게 좋음
connection.connect();
export async function queryExecute(str, values) {

	let data = await new Promise((resolve, reject) => {
		connection.query(str, values, function (error, results) {
			resolve(results);
		});
	})
	return data;
}
