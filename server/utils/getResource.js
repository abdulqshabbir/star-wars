import fetch from 'node-fetch'

export default function getResource(path, fields) {
    return fetch(path)
        .then(res => res.json())
        .then(data => {
            const resource = createResourceUsingFields(data, fields)
            return resource
        })
        .catch((e) => {
            console.log(e)
            return null
        })
}

function createResourceUsingFields(data, fields) {
    return fields.reduce((acc, field) => {
        if (field in data) {
            acc[field] = data[field]
            return acc 
        } 
        return acc 
    }, {})
}