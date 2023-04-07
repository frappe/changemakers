const BASE_URL = "https://apf-changemakers-staging.frappe.cloud"
import { session } from "@/data/session"

export function request(_options) {
	let options = Object.assign({}, _options)
	if (!options.url) {
		throw new Error("[request] options.url is required")
	}
	if (options.transformRequest) {
		options = options.transformRequest(_options)
	}
	if (!options.responseType) {
		options.responseType = "json"
	}
	if (!options.method) {
		options.method = "GET"
	}

	let url = options.url
	let body
	if (options.params) {
		if (options.method === "GET") {
			let params = new URLSearchParams()
			for (let key in options.params) {
				params.append(key, options.params[key])
			}
			url = options.url + "?" + params.toString()
		} else {
			body = JSON.stringify(options.params)
		}
	}

	return fetch(url, {
		method: options.method || "GET",
		headers: options.headers,
		body,
	}).then((response) => {
		if (options.transformResponse) {
			return options.transformResponse(response, options)
		}
		if (response.status >= 200 && response.status < 300) {
			if (options.responseType === "json") {
				return response.json()
			}
			return response
		} else {
			let error = new Error(response.statusText)
			error.response = response
			throw error
		}
	})
}

export function customRequestFetcher(options) {
	return request({
		...options,
		transformRequest: (options = {}) => {
			if (!options.url) {
				throw new Error("[frappeRequest] options.url is required")
			}

			// TODO: somehow get the oauth token here
			// maybe use a global store object (reactive)
			const oauth_access_token = session.auth.accessToken
			const headers = Object.assign(
				{
					Accept: "application/json",
					"Content-Type": "application/json; charset=utf-8",
					Authorization: `Bearer ${oauth_access_token}`,
				},
				options.headers || {}
			)

			if (!options.url.startsWith("/") && !options.url.startsWith("http")) {
				options.url = BASE_URL + "/api/method/" + options.url
			}
			console.log("options: " + options.url)
			return {
				...options,
				method: options.method || "POST",
				headers,
			}
		},
		transformResponse: async (response, options) => {
			let url = options.url
			if (response.ok) {
				const data = await response.json()
				if (data.docs || url === "login") {
					return data
				}
				if (data.exc) {
					try {
						console.groupCollapsed(url)
						console.log(options)
						let warning = JSON.parse(data.exc)
						for (let text of warning) {
							console.log(text)
						}
						console.groupEnd()
					} catch (e) {
						console.warn("Error printing debug messages", e)
					}
				}
				return data.message
			} else {
				let errorResponse = await response.text()
				let error, exception
				try {
					error = JSON.parse(errorResponse)
					// eslint-disable-next-line no-empty
				} catch (e) {}
				let errorParts = [
					[options.url, error.exc_type, error._error_message]
						.filter(Boolean)
						.join(" "),
				]
				if (error.exc) {
					exception = error.exc
					try {
						exception = JSON.parse(exception)[0]
						console.log(exception)
						// eslint-disable-next-line no-empty
					} catch (e) {}
				}
				let e = new Error(errorParts.join("\n"))
				e.exc_type = error.exc_type
				e.exc = exception
				e.status = errorResponse.status
				e.messages = error._server_messages
					? JSON.parse(error._server_messages)
					: []
				e.messages = e.messages.concat(error.message)
				e.messages = e.messages.map((m) => {
					try {
						return JSON.parse(m).message
					} catch (error) {
						return m
					}
				})
				e.messages = e.messages.filter(Boolean)
				if (!e.messages.length) {
					e.messages = error._error_message
						? [error._error_message]
						: ["Internal Server Error"]
				}

				if (options.onError) {
					options.onError({
						response: errorResponse,
						status: errorResponse.status,
						error: e,
					})
				}

				throw e
			}
		},
	})
}
