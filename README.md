# Restaurants Component

This is a React component for managing a list of restaurants. It uses the context API for state management and hooks for side effects and local state.

## Features

- **Display a list of restaurants**: The component fetches and displays a list of restaurants from the provided API.
- **Add a new restaurant**: The component allows the user to add a new restaurant by submitting a form.
- **Delete a restaurant**: The component allows the user to delete a restaurant.
- **Star a restaurant**: The component allows the user to star a restaurant.
- **Update a restaurant's name**: The component allows the user to update the name of a restaurant.

## API

The component interacts with the following API endpoints:

- `getRestaurants`: Fetches the list of restaurants.
- `addNewRestaurant`: Adds a new restaurant.
- `deleteRestaurant`: Deletes a restaurant.
- `updateRestaurantName`: Updates the name of a restaurant.
- `starRestaurant`: Stars a restaurant.

## Context

The component uses the `RestaurantsContext` for state management. The context provides the current state of restaurants and a dispatch function for state updates.

## Local State

The component maintains a local state `newRestaurantName` for the input field of the new restaurant form.

## Side Effects

The component uses the `useEffect` hook to fetch the list of restaurants when the component mounts.

## Handlers

The component defines handlers for adding, deleting, starring, and updating restaurants. These handlers interact with the API and dispatch actions to the context.

## Rendering

The component renders a list of restaurants and a form for adding a new restaurant. Each restaurant is rendered as a `Restaurant` component.