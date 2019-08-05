from selenium import webdriver
from selenium.webdriver.common.keys import Keys
driver = webdriver.Firefox()
f=open("chats.txt", "w")
for page_num in range(1, 250):
    driver.get('https://combot.org/telegram/top/chats?lng=ru&page=' + str(page_num))
    for str_num in range(1, 11):
        f.write(driver.find_element_by_xpath('//*[@id="chats"]/tr['+str(str_num)+']/td[3]/span[2]').text+"\n")
