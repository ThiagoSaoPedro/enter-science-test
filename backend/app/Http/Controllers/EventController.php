<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // Method to list all events
    public function index()
    {
        return response()->json(Event::all(), 200);
    }

    // Method to create a new event
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'artist_selected' => 'required|string|max:255',
            'fees' => 'nullable|numeric|min:0',
            'date_event' => 'required|date',
            'adress' => 'required|string|max:500',
        ]);

        $event = Event::create($validatedData);

        return response()->json([
            'message' => 'Event successfully created!',
            'data' => $event->toArray()
        ], 201);
    }

    public function show($id)
    {
        $event = Event::find($id);
    
        if (!$event) {
            return response()->json([
                'message' => 'Event not found!',
            ], 404);
        }
    
        return response()->json($event, 200);
    }

    // Method to update an existing event
    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found!',
            ], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'artist_selected' => 'sometimes|string|max:255',
            'fees' => 'sometimes|nullable|numeric|min:0',
            'date_event' => 'sometimes|date',
            'adress' => 'sometimes|string|max:500',
        ]);

        $event->update($validatedData);

        return response()->json([
            'message' => 'Event successfully updated!',
            'data' => $event->toArray()
        ], 200);
    }

    // Method to delete an event
    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found!',
            ], 404);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event successfully deleted!',
        ], 200);
    }
}