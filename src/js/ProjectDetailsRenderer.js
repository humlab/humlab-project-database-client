import { Utils } from './Utils.js';

/**
 * Renderer class for displaying detailed project information
 */
export class ProjectDetailsRenderer {
  /**
   * Render project details into a container element
   * @param {HTMLElement} container - The container to render into
   * @param {Object} project - The project data object
   */
  static render(container, project) {
    container.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "project-detail";

    this.renderHeader(wrapper, project);
    this.renderCoverImage(wrapper, project);
    this.renderPullQuote(wrapper, project);
    this.renderLongText(wrapper, project);
    this.renderGallery(wrapper, project);
    this.renderVideos(wrapper, project);
    this.renderLinks(wrapper, project);
    this.renderPeople(wrapper, project);
    this.renderPartners(wrapper, project);

    container.appendChild(wrapper);
  }

  /**
   * Render the project header (title, subtitle, description)
   * @private
   */
  static renderHeader(wrapper, project) {
    const header = document.createElement("header");
    header.className = "project-detail__header";

    const title = document.createElement("h2");
    title.className = "project-detail__title";
    title.textContent = project.title || project.id || "Project";
    header.appendChild(title);

    if (project.subtitle) {
      const subtitle = document.createElement("p");
      subtitle.className = "project-detail__subtitle";
      subtitle.textContent = project.subtitle;
      header.appendChild(subtitle);
    }

    if (project.description) {
      const summary = document.createElement("p");
      summary.className = "project-detail__summary";
      summary.textContent = project.description;
      header.appendChild(summary);
    }

    wrapper.appendChild(header);
  }

  /**
   * Render the cover image
   * @private
   */
  static renderCoverImage(wrapper, project) {
    const images = Array.isArray(project.images) ? project.images : [];
    const coverImage = images.find((image) => image?.cover) || images[0];

    if (coverImage?.url) {
      const media = document.createElement("section");
      media.className = "project-detail__media";

      const figure = document.createElement("figure");
      figure.className = "project-detail__figure";

      const img = document.createElement("img");
      img.src = Utils.resolveAssetUrl(coverImage.url);
      img.alt = coverImage.alt || project.title || "Project image";
      figure.appendChild(img);

      if (coverImage.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = coverImage.caption;
        figure.appendChild(caption);
      }

      media.appendChild(figure);
      wrapper.appendChild(media);
    }
  }

  /**
   * Render pull quote if available
   * @private
   */
  static renderPullQuote(wrapper, project) {
    if (project.pullQuote) {
      const quote = document.createElement("blockquote");
      quote.className = "project-detail__quote";
      quote.textContent = project.pullQuote;
      wrapper.appendChild(quote);
    }
  }

  /**
   * Render long text content
   * @private
   */
  static renderLongText(wrapper, project) {
    if (project.longText) {
      const body = document.createElement("section");
      body.className = "project-detail__body";
      body.appendChild(Utils.createParagraphs(project.longText));
      wrapper.appendChild(body);
    }
  }

  /**
   * Render image gallery (additional images)
   * @private
   */
  static renderGallery(wrapper, project) {
    const images = Array.isArray(project.images) ? project.images : [];
    const coverImage = images.find((image) => image?.cover) || images[0];
    const additionalImages = images.filter((image) => image && image !== coverImage);

    if (additionalImages.length) {
      const gallery = document.createElement("section");
      gallery.className = "project-detail__gallery";
      
      additionalImages.forEach((image) => {
        if (!image?.url) return;
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = Utils.resolveAssetUrl(image.url);
        img.alt = image.alt || project.title || "Project image";
        figure.appendChild(img);
        
        if (image.caption) {
          const caption = document.createElement("figcaption");
          caption.textContent = image.caption;
          figure.appendChild(caption);
        }
        
        gallery.appendChild(figure);
      });
      
      wrapper.appendChild(gallery);
    }
  }

  /**
   * Render videos section
   * @private
   */
  static renderVideos(wrapper, project) {
    const videos = Array.isArray(project.videos) ? project.videos : [];
    if (videos.length) {
      const section = document.createElement("section");
      section.className = "project-detail__section videos";

      const heading = document.createElement("h3");
      heading.textContent = "Videos";
      section.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "project-detail__list";
      
      videos.forEach((video) => {
        if (!video?.url) return;
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = video.url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = video.caption || video.alt || video.url;
        item.appendChild(link);
        list.appendChild(item);
      });

      section.appendChild(list);
      wrapper.appendChild(section);
    }
  }

  /**
   * Render links section
   * @private
   */
  static renderLinks(wrapper, project) {
    const links = Array.isArray(project.links) ? project.links : [];
    if (links.length) {
      const section = document.createElement("section");
      section.className = "project-detail__section links";

      const heading = document.createElement("h3");
      heading.textContent = "Links";
      section.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "project-detail__list";
      
      links.forEach((linkItem) => {
        if (!linkItem?.url) return;
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = linkItem.url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = linkItem.label || linkItem.url;
        item.appendChild(link);
        list.appendChild(item);
      });

      section.appendChild(list);
      wrapper.appendChild(section);
    }
  }

  /**
   * Render people section
   * @private
   */
  static renderPeople(wrapper, project) {
    const people = Array.isArray(project.people) ? project.people : [];
    if (people.length) {
      const section = document.createElement("section");
      section.className = "project-detail__section people";

      const heading = document.createElement("h3");
      heading.textContent = "People";
      section.appendChild(heading);

      const list = document.createElement("div");
      list.className = "project-detail__people";

      people.forEach((person, index) => {
        if (!person?.name) return;
        const card = document.createElement("div");
        card.className = "project-detail__person";
        card.style.transitionDelay = `${index * 80}ms`;

        if (person.profileImage) {
          const avatar = document.createElement("img");
          avatar.className = "project-detail__person-avatar";
          avatar.src = Utils.resolveAssetUrl(person.profileImage);
          avatar.alt = person.name;
          card.appendChild(avatar);
        }

        const info = document.createElement("div");
        const name = document.createElement("div");
        name.className = "project-detail__person-name";
        name.textContent = person.name;
        info.appendChild(name);

        if (person.association) {
          const assoc = document.createElement("div");
          assoc.className = "project-detail__person-assoc";
          assoc.textContent = person.association;
          info.appendChild(assoc);
        }

        if (person.link) {
          const link = document.createElement("a");
          link.href = person.link;
          link.target = "_blank";
          link.rel = "noopener";
          link.className = "project-detail__person-link";
          info.appendChild(link);

          // Make entire card clickable
          card.addEventListener("click", () => {
            window.open(person.link, "_blank", "noopener");
          });
        }

        card.appendChild(info);
        list.appendChild(card);
      });

      section.appendChild(list);
      wrapper.appendChild(section);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      list.querySelectorAll(".project-detail__person").forEach((card) => {
        observer.observe(card);
      });
    }
  }

  /**
   * Render partner sections (financiers, infrastructures, cooperation partners)
   * @private
   */
  static renderPartners(wrapper, project) {
    const partnerSections = [
      { key: "financier", label: "Financiers" },
      { key: "infrastructures", label: "Infrastructures" },
      { key: "cooperation_partners", label: "Cooperation partners" },
    ];

    partnerSections.forEach(({ key, label }) => {
      const entries = Array.isArray(project[key]) ? project[key] : [];
      if (!entries.length) return;
      
      const section = document.createElement("section");
      section.className = `project-detail__section ${key.replace(/_/g, '-')}`;

      const heading = document.createElement("h3");
      heading.textContent = label;
      section.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "project-detail__list";
      
      entries.forEach((entry) => {
        if (!entry?.name) return;
        const item = document.createElement("li");
        
        if (entry.link) {
          const link = document.createElement("a");
          link.href = entry.link;
          link.target = "_blank";
          link.rel = "noopener";
          link.textContent = entry.name;
          item.appendChild(link);
        } else {
          item.textContent = entry.name;
        }
        
        list.appendChild(item);
      });

      section.appendChild(list);
      wrapper.appendChild(section);
    });
  }
}
