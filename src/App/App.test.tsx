import AppPO from './AppPageObj'

describe('App', () => {
  describe('when /upload view rendered', () => {
    let renderedApp: AppPO

    beforeEach(() => {
      renderedApp = new AppPO({
        initialEntries: ['/upload']
      })
    })

    it('should render nav bar', async () => {
      const uploadView = await renderedApp.getNav()

      expect(uploadView).toBeDefined()
    })
  })
})
