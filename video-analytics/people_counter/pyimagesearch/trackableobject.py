class TrackableObject:
	def __init__(self, objectID, centroid):
		# store the object ID, then initialize a list of centroids
		# using the current centroid
		self.objectID = objectID
		self.centroids = [centroid]

		# initialize a boolean used to indicate if the object has
		# already been counted or not
		self.counted = False
		#self.move = {'up': False, 'down': False}
		self.changeDirection = False

"""
		self.moveUp = False
		self.moveDown = False
		self.changeDirection = False
"""