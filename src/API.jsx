export default class API {
  static async getRelations(word, relation, limits = null) {
    let res = await fetch(
      `${process.env.REACT_APP_API_URL}/${word}/${relation}${
        limits !== null ? "/" + limits : ""
      }`,
      { method: "GET", mode: "cors" }
    );
    let json = await res.json();
    return json.data;
  }

  static async getDefinitions(word) {
    let res = await fetch(
      `${process.env.REACT_APP_API_URL}/${word}/definitions`,
      { method: "GET", mode: "cors" }
    );
    let json = await res.json();
    return json.data;
  }

  static async getAutocomplete(word) {
    let res = await fetch(
      `${process.env.REACT_APP_API_URL}/${word}/autocomplete`,
      { method: "GET", mode: "cors" }
    );
    let json = await res.json();
    return json.data;
  }
}
