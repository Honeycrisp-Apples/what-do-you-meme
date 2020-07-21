import React from 'react';
import firebase from 'firebase';

export async function AcceptFriendRequest(request, currentUser) {
	let newFriend = {
		userId: request.userID,
		imageURL: request.picture,
		displayName: request.name
	};
	let current = {}
	if(currentUser.data()){
		current = {
			userId: currentUser.ref.id,
			imageURL: currentUser.data().imageURL,
			displayName: currentUser.data().displayName
		}
	}
	console.log("Current:", current)
	await firebase.firestore().collection('users').doc(`${request.userID}`).update({
		friends: firebase.firestore.FieldValue.arrayUnion(current)
	});
	console.log("Hit me!")
	await currentUser.ref.update({
		friends: firebase.firestore.FieldValue.arrayUnion(newFriend),
		requests: firebase.firestore.FieldValue.arrayRemove(request)
	});
}

export async function DeclineFriendRequest(request, currentUser) {
	await currentUser.ref.update({
		requests: firebase.firestore.FieldValue.arrayRemove(request)
	});
}
