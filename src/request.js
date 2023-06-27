
export default async function request(path, method, parameters) {

  const body = JSON.stringify({
    jsonrpc: '2.0',
    method: 'call',
    params: parameters
  });

  const requestOptions = {
    method: method,
    body: body,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };
  return await fetch(path, requestOptions)
}
