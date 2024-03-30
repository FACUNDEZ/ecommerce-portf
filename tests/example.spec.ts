// @ts-check
import { test, expect } from '@playwright/test'

//const CLOTHES_PREFIX_IMAGE_URL= 'https://fakestoreapi.com/products/'
const LOCALHOST_URL = 'http://localhost:3000/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const svg = await page.getByTestId("svg-test")
 // const image = await page.getByTestId('image-testing')

  const textContent = await text.textContent()

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(svg).not.toBeNull();
 // await expect(imageSrc?.startsWith(CLOTHES_PREFIX_IMAGE_URL)).toBeTruthy()

  const viewBoxAttribute = await svg.getAttribute('viewBox');
  const widthAttribute = await svg.getAttribute('width');
  const heightAttribute = await svg.getAttribute('height');

  expect(viewBoxAttribute).toEqual('0 0 24 24'); 
  expect(widthAttribute).toEqual('35'); 
  expect(heightAttribute).toEqual('35'); 
})