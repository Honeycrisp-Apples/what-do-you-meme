import React from 'react';
import firebase from 'firebase';

export async function AcceptFriendRequest(request, currentUser) {
	// let newFriend = {
	// 	userId: request.userID,
	// 	imageURL: request.picture,
	// 	displayName: request.name
	// };

	let newFriend = await firebase.firestore().collection('users').doc(`${request.userID}`).get();
	await currentUser.ref.update({
		friends: firebase.firestore.FieldValue.arrayUnion(newFriend.data())
	});
	await newFriend.ref.update({
		friends: firebase.firestore.FieldValue.arrayUnion(currentUser.data())
	});
	await currentUser.ref.update({
		requests: firebase.firestore.FieldValue.arrayRemove(request)
	});
}

export async function DeclineFriendRequest(request, currentUser) {
	await currentUser.ref.update({
		requests: firebase.firestore.FieldValue.arrayRemove(request)
	});
}
