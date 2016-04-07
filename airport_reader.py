import re, os, pdb, math, operator, decimal, csv

frontier_airports = []
of_airports = []

def read_airports_dat():
	with open('of_airports.csv') as csvfile:
		airport_reader = csv.DictReader(csvfile)
		for row in airport_reader:
			of_airports.append(row)

def read_frontier_csv():
	with open('frontier_airports.csv') as csvfile:
		airport_reader = csv.DictReader(csvfile)
		for row in airport_reader:
			frontier_airports.append(row)

def main():
	read_frontier_csv()
	read_airports_dat()

	with open('complete_airport_info.csv', 'wb') as csvfile:
		airport_writer = csv.writer(csvfile)
		airport_writer.writerow([
			'City',
			'IATA',
			'Latitude',
			'Longitude'])
		for frontier in frontier_airports:
			for of in of_airports:
				if of['IATA'] == frontier['IATA']:
					airport_writer.writerow([
						of['City'],
						of['IATA'],
						of['Latitude'],
						of['Longitude']])



if __name__ == '__main__':
	main()