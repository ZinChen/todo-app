import { shallowMount, createLocalVue } from "@vue/test-utils"
import VueRouter from "vue-router";
import App from "./App.vue"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('App', () => {
  it('should be vue instance', () => {
    let wrapper = shallowMount(App, {
      // stubs: ['router-view'],
      localVue
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
