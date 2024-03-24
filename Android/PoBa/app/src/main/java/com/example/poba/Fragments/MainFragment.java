package com.example.poba.Fragments;

import android.graphics.Bitmap;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.example.poba.R;
public class MainFragment extends Fragment {

    private ImageView rendelesek_preview;
    private ImageView termekek_preview;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view =  inflater.inflate(R.layout.fragment_main, container, false);

        Init(view);

        //TODO: preview images PreviewFragment function

        return view;
    }

    public void Init(View view) {
        rendelesek_preview = view.findViewById(R.id.rendelesek_preview);
        termekek_preview = view.findViewById(R.id.termekek_preview);
    }


    public void PreviewFragment(int layout, ImageView imageview) {
        View nextrFragment = LayoutInflater.from(getContext()).inflate(layout, null);
        nextrFragment.layout(0, 0, imageview.getWidth(), imageview.getHeight());
        nextrFragment.setDrawingCacheEnabled(true);
        nextrFragment.buildDrawingCache();
        Bitmap previewBitmap = Bitmap.createBitmap(nextrFragment.getDrawingCache());
        nextrFragment.setDrawingCacheEnabled(false);
        imageview.setImageBitmap(previewBitmap);
    }
}