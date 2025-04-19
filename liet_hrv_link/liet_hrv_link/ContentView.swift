//
//  ContentView.swift
//  liet_hrv_link
//
//  Created by 김종혁 on 4/16/25.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "Liet_main_page")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Liet")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
