// app/javascript/controllers/address_autocomplete_controller.js
import { Controller } from "@hotwired/stimulus"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

// Connects to data-controller="address-autocomplete"
export default class extends Controller {
  static values = { apiKey: String }

  static targets = ["location"]

  connect() {
    console.log("conncted")
    this.geocoder = new MapboxGeocoder({
      accessToken: this.apiKeyValue,
      types: "country,region,place,postcode,locality,neighborhood,address"
    })
    this.geocoder.addTo(this.element)
    this.geocoder.on("result", event => this.#setInputValue(event))
    this.geocoder.on("clear", () => this.#clearInputValue())
  }
  #setInputValue(event) {
    this.locationTarget.value = event.result["place_name"]
  }

  #clearInputValue() {
    this.locationTarget.value = ""
  }

  disconnect() {
    this.geocoder.onRemove()
  }
}
