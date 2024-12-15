import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";

export class ResponseService {
	public async findById(id: string) {
		try {
			if (!id) throw httpException("Id response not found.", HttpStatus.NOT_FOUND);

			return {
				_id: id,
				name: "Jhon Doe",
				email: "jhondoe@gmail.com",
			};
		} catch (error) {
			throw error;
		}
	}

	public async listAll() {
		return [
			{
				_id: String(Math.floor(Math.random() * 1000)),
				name: "Jhon Doe",
				email: "jhondoe@gmail.com",
			},
			{
				_id: String(Math.floor(Math.random() * 1000)),
				name: "Foo Bar",
				email: "foobar@gmail.com",
			},
		];
	}
}
