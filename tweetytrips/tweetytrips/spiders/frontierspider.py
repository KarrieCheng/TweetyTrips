import scrapy


from tweetytrips.items import TweetytripsItem

class FrontierSpider(scrapy.Spider):
    name = "frontier"
    allowed_domains = ["flyfrontier.com"]
    start_urls = ["https://www.flyfrontier.com/ways-to-save/online-deals/"]

    def parse(self, response):
        for sel in response.xpath('//div[@class="ContentRow"]'):
            # item = TweetytripsItem()
            airport = sel.xpath('//div[@class="BookNow"]').extract()
            # #get origin and destination from this
            price = sel.xpath('//div[@class="Price"]').extract()
            dates = sel.xpath('//div[@class="Price"]').extract()
            # yield item
            print airport, price, dates
