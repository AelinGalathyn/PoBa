package com.example.pobatest.Webshopok;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.example.pobatest.R;

import java.util.List;

public class WebshopAdapter extends RecyclerView.Adapter<WebshopAdapter.WebshopHolder> {
    private final Context context;
    private final List<Webshop> webshopok;

    public WebshopAdapter(Context context, List<Webshop> webshopok) {
        this.context = context;
        this.webshopok = webshopok;
    }

    public static class WebshopHolder extends RecyclerView.ViewHolder {
        TextView webshop_nev_textview;
        ImageView torles_icon;
        public WebshopHolder(@NonNull View itemView) {
            super(itemView);

            webshop_nev_textview = itemView.findViewById(R.id.webshop_nev_textview);
            torles_icon = itemView.findViewById(R.id.torles_icon);
        }
    }

    @NonNull
    @Override
    public WebshopAdapter.WebshopHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.webshop_row, parent, false);
        return new WebshopAdapter.WebshopHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull WebshopAdapter.WebshopHolder holder, int position) {
        Webshop webshop = webshopok.get(position);
        holder.webshop_nev_textview.setText(webshop.nev);
        holder.torles_icon.setOnClickListener(v -> {
            showPopup(v, holder.getAdapterPosition());
        });
    }

    @Override
    public int getItemCount() {
        return webshopok.size();
    }

    public void showPopup(View v, int position) {
        Webshop webshop = webshopok.get(position);

        View popupView = LayoutInflater.from(v.getContext()).inflate(R.layout.apikulcs_popup_activity, null);
        AlertDialog.Builder abBuilder = new AlertDialog.Builder(v.getContext());
        AlertDialog ab = abBuilder.setView(popupView).create();
        ab.getWindow().setBackgroundDrawableResource(R.drawable.custom_popup);

        ImageButton popup_no_icon = (ImageButton) popupView.findViewById(R.id.popup_no_icon);
        ImageButton popup_yes_icon = (ImageButton) popupView.findViewById(R.id.popup_yes_icon);
        TextView kerdes_helye = popupView.findViewById(R.id.kerdes_helye);
        TextView webshop_nev_helye = popupView.findViewById(R.id.webshop_nev_helye);
        TextView apikey_helye = popupView.findViewById(R.id.apikey_helye);

        kerdes_helye.setText("Biztos szeretné törölni?");
        webshop_nev_helye.setText(webshop.nev);
        apikey_helye.setVisibility(View.INVISIBLE);

        popup_no_icon.setOnClickListener(view -> ab.dismiss());
        popup_yes_icon.setOnClickListener(view -> {
            webshopok.remove(webshop);
            this.notifyItemRemoved(position);
            ab.dismiss();
        });

        ab.show();
    }
}