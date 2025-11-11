import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Portal-pruebaPage from '../app/pages/portal-prueba/index.vue'

describe('portal-prueba Page', () => {
  it('renders the page component', async () => {
    const wrapper = await mountSuspended(Portal-pruebaPage)

    // Verificar que el componente existe
    expect(wrapper.exists()).toBe(true)

    // Verificar que contiene un título h1
    const heading = wrapper.find('h1')
    expect(heading.exists()).toBe(true)

    // Verificar el contenido del título
    expect(heading.text()).toBe('/layers/portal-prueba/app/pages/portal-prueba/index.vue')
  })

  it('displays the correct heading text', async () => {
    const wrapper = await mountSuspended(Portal-pruebaPage)

    const heading = wrapper.find('h1')
    expect(heading.text()).toContain('portal-prueba')
  })

  it('has the correct route path', async () => {
    const wrapper = await mountSuspended(Portal-pruebaPage)

    const heading = wrapper.find('h1')
    expect(heading.text()).toContain('/layers/portal-prueba/')
  })

  it('renders without errors', async () => {
    const wrapper = await mountSuspended(Portal-pruebaPage)

    // Verificar que el componente se renderiza sin errores
    expect(wrapper.html()).toContain('<h1')
    expect(wrapper.vm.$el).toBeDefined()
  })
})
