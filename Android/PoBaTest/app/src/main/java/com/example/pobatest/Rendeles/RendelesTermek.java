package com.example.pobatest.Rendeles;

import org.json.JSONException;
import org.json.JSONObject;

public class RendelesTermek {
    private Integer id;
    private String sku;
    private String name;
    private String unit;
    private Double qty;
    private Double net;
    private Integer gross;
    private String vat;
    private String status;

    public RendelesTermek(JSONObject object) throws JSONException {
        id = object.getInt("id");
        sku = object.getString("sku");
        name = object.getString("name");
        unit = object.getString("unit");
        qty = object.getDouble("quantity");
        net = object.getDouble("net");
        gross = object.getInt("gross");
        vat = object.getString("vat");
        status = object.getString("status");
    }
}
