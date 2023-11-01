function deleteAllDumbDivs() {
  document
    .querySelectorAll(`div[data-0="0"][data-1="1"][data-2="2"]`)
    .forEach((element) => element.remove());
}
function handlePost(post) {
  const h3 = post.getElementsByTagName("h3").item(0);
  if (h3 && h3.textContent.endsWith(" is interested.")) {
    console.log("SEE YA");
    post.style.display = "none";
    post.setAttribute("data-simi-fb", "handled");
  }
  //
  const linkThing = post.querySelector(`span>a[href="#"][role="link"]`);
  if (linkThing) {
    let isAllSpans = true;
    const children = linkThing.getElementsByTagName("*");
    for (const child of children) {
      if (child.nodeName !== "SPAN") {
        isAllSpans = false;
      }
    }
    //
    post.setAttribute("data-simi-fb", "handled");
    //
    if (isAllSpans && post.textContent.includes("· Shared with Public")) {
      const parentThing = linkThing.parentElement.parentElement.parentElement;
      const postPrivacyIcon = parentThing.querySelector("span>span>span>svg");
      const postPrivacyTitle = postPrivacyIcon.getAttribute("title");
      if (
        postPrivacyTitle.startsWith("Shared with ") &&
        postPrivacyTitle.endsWith("'s friends")
      ) {
        return;
      } else {
        console.log("GOODBYE");
        const h3 = post.getElementsByTagName("h3").item(0);
        if (h3 && h3.textContent.endsWith("Verified account")) {
          post.style.display = "none";
        } else {
          post.style.opacity = 0.25;
          post.style.height = "64px";
          post.style.overflow = "hidden";
          post.style.margin = "16px";
        }
      }
    }
  }
}
function simiFB() {
  if (window.location.href === "https://www.facebook.com/") {
    window.location.href = "https://www.facebook.com/?filter=friends&sk=h_chr";
  }
  if (window.location.search.startsWith("?filter=")) {
    deleteAllDumbDivs();
    const h2s = document.getElementsByTagName("h2");
    const h2 = h2s.item(0);
    if (h2s.length === 1 && h2 && h2.innerText === "News Feed posts") {
      const posts = h2.nextElementSibling.children;
      for (const post of posts) {
        if (post.getAttribute("data-simi-fb") !== "handled") {
          handlePost(post);
        }
      }
    }
  }
}
setInterval(simiFB, 888);
