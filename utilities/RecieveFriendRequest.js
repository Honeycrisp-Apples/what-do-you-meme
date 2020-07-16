import React from 'react';
import firebase from 'firebase';

export function RecieveFriendRequests(currentUser) {
	console.log('placeholder');
}

export async function DeclineFriendRequest(request, currentUser) {
	await currentUser.ref.update({
		requests: firebase.firestore.FieldValue.arrayRemove(request)
	});
}
