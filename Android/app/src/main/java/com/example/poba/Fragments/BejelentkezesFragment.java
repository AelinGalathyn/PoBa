package com.example.poba.Fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;

import com.example.poba.R;
public class BejelentkezesFragment extends Fragment {
    private ImageButton bejelentkezes_gomb;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_bejelentkezes, container, false);

        Init(view);

        bejelentkezes_gomb.setOnClickListener(view2 -> {
            Navigation.findNavController(view).navigate(R.id.action_egyszeriBelepesFragment2_to_bejelentkezesFragment);
        });

        return view;
    }

    public void Init(View view) {
        bejelentkezes_gomb = view.findViewById(R.id.bejelentkezes_gomb);
    }
}