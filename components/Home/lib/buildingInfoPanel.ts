import { gsap } from "gsap";
import { servicesOffered } from "../../service/servicesData";
import { createBackToMainButton } from "./createBackToMainButton";

// building group name -> service title in servicesOffered
const buildingServiceTitle: Record<string, string> = {
  road_show_building_grp: "Roadshow",
  wall_painting_building_grp: "Wall Painting",
  digital_marketing_building_grp: "Digital Marketing",
  fixtures_building_grp: "Fixtures",
  event_building_grp: "Events & Activation",
  media_ads_building_grp: "OOH Media",
  ooh_building_grp: "OOH Media",
  sinage_side_building_grp: "Signage",
  signage_side_building_grp: "Signage",
};

// buildings without a service entry
const extraInfo: Record<string, { title: string; description: string }> = {
  adinn_hq_building_grp: {
    title: "Adinn HQ",
    description:
      "Managing OOH Media, Roadshows, Signage, Events & Activation",
  },
};

function getBuildingInfo(buildingName: string) {
  const service = servicesOffered.find(
    (s) => s.title === buildingServiceTitle[buildingName],
  );
  if (service) {
    return { ...service, icon: service.icons.src as string | undefined };
  }

  return (
    extraInfo[buildingName] ?? {
      // fallback: readable name from "xyz_building_grp"
      title: buildingName
        .replace(/_building_grp$/, "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      description: "",
    }
  );
}

export function showBuildingInfoPanel(
  buildingName: string,
  onBackToMain: () => void,
) {
  const info: { title: string; description: string; icon?: string } =
    getBuildingInfo(buildingName);

  const panel = document.createElement("div");
  Object.assign(panel.style, {
    position: "fixed",
    top: "50%",
    right: "32px",
    zIndex: "9999",
    width: "min(360px, calc(100vw - 32px))",
    padding: "24px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.96)",
    color: "#111",
    boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
    fontFamily: "inherit",
  });

  if (info.icon) {
    const img = document.createElement("img");
    img.src = info.icon;
    img.alt = "";
    Object.assign(img.style, { width: "48px", height: "48px", marginBottom: "12px" });
    panel.appendChild(img);
  }

  const title = document.createElement("h3");
  title.textContent = info.title;
  Object.assign(title.style, {
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#CF1E00",
  });
  panel.appendChild(title);

  if (info.description) {
    const desc = document.createElement("p");
    desc.textContent = info.description;
    Object.assign(desc.style, { margin: "0", fontSize: "15px", lineHeight: "1.6" });
    panel.appendChild(desc);
  }

  document.body.appendChild(panel);
  gsap.fromTo(
    panel,
    { opacity: 0, x: 24, yPercent: -50 },
    { opacity: 1, x: 0, yPercent: -50, duration: 0.45, ease: "power3.out" },
  );

  const removeBackButton = createBackToMainButton(onBackToMain);

  return () => {
    gsap.killTweensOf(panel);
    panel.remove();
    removeBackButton();
  };
}
